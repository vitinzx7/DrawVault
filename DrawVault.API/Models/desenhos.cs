namespace DrawVault.API.Models;

public class Desenho
{
    public int Id {get; set;}
    public string Titulo {get; set;}
    public DateTime DataCriacao {get; set;}
    public string Descricao {get; set;}
    public string CaminhoImagem {get; set;}
}