import axios from "axios";

const API = "http://localhost:8080/api/pedidos";

export const PedidoService = {
  crearPedido: async (pedido, token) => {
    const res = await axios.post(`${API}/crear`, pedido, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },

  misPedidos: async (token) => {
    const res = await axios.get(`${API}/mis-pedidos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
};
