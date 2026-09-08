/**
 * 模拟「后端把页面 JSON 登记在文档上、文档提供公开接口查询」的服务：
 * - GET /api/page-registry          页面登记文档（page-generator 拉取这份）
 * - GET/POST/PUT/DELETE /api/:resource   各页面真实的 CRUD 数据
 */
import { createServer } from "node:http";

const PORT = process.env.MOCK_PORT || 4173;

/**
 * 页面登记文档：这就是“后端登记在文档上的 JSON”
 */
const pageRegistry = {
  version: "2026-09-08",
  pages: [
    {
      route: "/users",
      name: "UsersPage",
      title: "用户管理",
      api: "/api/users",
      columns: [
        { title: "姓名", dataIndex: "name" },
        { title: "年龄", dataIndex: "age" },
        { title: "类型", dataIndex: "type" },
      ],
      formItems: [
        { label: "姓名", key: "name", type: "input" },
        { label: "年龄", key: "age" },
        { label: "类型", key: "type" },
      ],
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入年龄" }],
      },
    },
    {
      route: "/goods",
      name: "GoodsPage",
      title: "商品管理",
      api: "/api/goods",
      columns: [
        { title: "商品名称", dataIndex: "name" },
        { title: "价格", dataIndex: "price" },
      ],
      formItems: [
        { label: "商品名称", key: "name", type: "input" },
        { label: "价格", key: "price" },
      ],
      rules: {
        name: [{ required: true, message: "请输入商品名称" }],
      },
    },
  ],
};

/**
 * 各页面的模拟数据表，key 是 /api/xxx 的 xxx
 */
const tables = {
  users: [
    { id: 1, name: "张三", age: 18, type: "管理员" },
    { id: 2, name: "李四", age: 20, type: "普通用户" },
  ],
  goods: [
    { id: 1, name: "键盘", price: 199 },
    { id: 2, name: "鼠标", price: 99 },
  ],
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function crud(resource) {
  const rows = tables[resource] || (tables[resource] = []);
  return {
    get: async (params) => {
      await delay(300);
      const keyword = params?.keyword || "";
      return { data: rows.filter((row) => String(row.name).includes(keyword)) };
    },
    create: async (data) => {
      await delay(300);
      data.id = rows.length + 1;
      rows.push(data);
      return { data: rows };
    },
    update: async (data) => {
      await delay(300);
      const index = rows.findIndex((row) => row.id === data.id);
      if (index !== -1) rows[index] = data;
      return { data: rows };
    },
    remove: async (ids) => {
      await delay(300);
      for (const id of ids) {
        const index = rows.findIndex((row) => row.id === id);
        if (index !== -1) rows.splice(index, 1);
      }
    },
  };
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(payload));
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return JSON.parse(Buffer.concat(chunks).toString("utf-8") || "{}");
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const path = url.pathname;

  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  if (path === "/api/page-registry") {
    sendJson(res, 200, pageRegistry);
    return;
  }

  const match = path.match(/^\/api\/(\w+)$/);
  if (match) {
    const api = crud(match[1]);
    try {
      if (req.method === "GET") {
        const params = Object.fromEntries(url.searchParams);
        sendJson(res, 200, await api.get(params));
      } else if (req.method === "POST") {
        sendJson(res, 200, await api.create(await readBody(req)));
      } else if (req.method === "PUT") {
        sendJson(res, 200, await api.update(await readBody(req)));
      } else if (req.method === "DELETE") {
        sendJson(res, 200, await api.remove(await readBody(req)));
      } else {
        sendJson(res, 405, { message: "method not allowed" });
      }
    } catch (error) {
      sendJson(res, 500, { message: error.message });
    }
    return;
  }

  sendJson(res, 404, { message: "not found" });
});

server.listen(PORT, () => {
  console.log(`[mock-server] 页面登记文档: http://localhost:${PORT}/api/page-registry`);
  console.log(`[mock-server] CRUD 示例: http://localhost:${PORT}/api/users`);
});
