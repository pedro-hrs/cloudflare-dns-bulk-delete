const axios = require('axios');

// Configurações da API Cloudflare
const API_TOKEN = process.env.API_TOKEN;
const ZONE_ID = process.env.ZONE_ID;
const CLOUDFLARE_API_URL = `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records`;

// Função para buscar todos os registros DNS
async function getAllDNSRecords() {
  try {
    const response = await axios.get(CLOUDFLARE_API_URL, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.result;
  } catch (error) {
    console.error('Erro ao buscar registros DNS:', error.message);
    return [];
  }
}

// Função para deletar um registro DNS pelo ID
async function deleteDNSRecord(recordId) {
  try {
    const deleteUrl = `${CLOUDFLARE_API_URL}/${recordId}`;
    const response = await axios.delete(deleteUrl, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`Registro DNS ${recordId} deletado com sucesso.`);
  } catch (error) {
    console.error(`Erro ao deletar registro DNS ${recordId}:`, error.message);
  }
}

// Função principal para buscar e deletar todos os registros DNS
async function deleteAllDNSRecords() {
  try {
    // Busca todos os registros DNS
    const records = await getAllDNSRecords();

    // Deleta cada registro DNS encontrado
    for (const record of records) {
      await deleteDNSRecord(record.id);
    }

    console.log('Todos os registros DNS foram deletados com sucesso.');
  } catch (error) {
    console.error('Erro ao deletar registros DNS:', error.message);
  }
}

// Chamada da função principal para deletar todos os registros DNS
deleteAllDNSRecords();
