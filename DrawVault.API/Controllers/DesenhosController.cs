using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using DrawVault.API.Models;

namespace DrawVault.API.Controllers;

[ApiController]
[Route("api/desenhos")]
public class DesenhosController : ControllerBase
{
    private readonly string _connectionString;
    public DesenhosController(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection")!;
    }


    //ROTA GET buscar todos os desenhos no banco de dados
    [HttpGet]
    public async Task<ActionResult<List<Desenho>>> GetDesenhos()
    
    {
        var desenhos = new List<Desenho>();
        using var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync();

        using var command = new MySqlCommand("SELECT * FROM drawing", connection);
        using var reader = await command.ExecuteReaderAsync();

        while (await reader.ReadAsync())
        {
            var desenho = new Desenho
            {
                id = reader.GetInt32("id"),
                name = reader.GetString("name"),
                description = reader.GetString("description"),
                date = reader.GetDateTime("date"),
                image_path = reader.GetString("image_path")
            };
            desenhos.Add(desenho);
        }
        return Ok(desenhos);
    }
     // Rota POST - adiciona um desenho novo no banco
     [HttpPost]
     public async Task<ActionResult<Desenho>>CreateDesenho([FromForm] IFormFile formFile ,[FromForm] string name, [FromForm] DateTime date, [FromForm] string description)
    {
        //Abre conexão com o My SQL
        using var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync();

        //INSERT com @ pra proetejer sql injection 
        var sql ="INSERT INTO drawing (name, description, date) VALUES (@name, @description, @date)";
        using var command = new MySqlCommand(sql, connection);

        //Cada @ recebe o valor que veio do formulário
        command.Parameters.AddWithValue("@name", name);
        command.Parameters.AddWithValue("@description", description);
        command.Parameters.AddWithValue("@date", date);


        // Executa o INSERT (não retorna linhas, por isso NonQuery)
        await command.ExecuteNonQueryAsync();

        // Pega o ID que o MySQL criou automaticamente
    var novoDesenho = new Desenho
            {
                name = name,
                description = description,
                date = date,
                id = (int)command.LastInsertedId
            };
            
        
         // Retorna status 201 (criado com sucesso)
        return Created("",novoDesenho);

    }
    //ROTA DELETE - deleta um desenho pelo ID
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteDesenho(int id)
    {
        // Abre conexão com o MySQL
        using var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync();

        // DELETE com @ para proteger contra SQL Injection
        var sql = "DELETE FROM drawing WHERE id = @id";
        using var command = new MySqlCommand(sql, connection);
        command.Parameters.AddWithValue("@id", id);
        
        // Executa o DELETE e retorna quantas linhas foram afetadas
        var rowsAffected = await command.ExecuteNonQueryAsync();

        // Se nenhuma linha foi afetada, o desenho não existe
        if (rowsAffected == 0)
        return NotFound();

        // Retorna status 204 (deletado com sucesso, sem conteúdo)
        return NoContent();

    }
}


