using Microsoft.Extensions.FileProviders;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddCors();
var app = builder.Build();
app.UseCors(policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider("/home/vitinzx/Área de trabalho/drawvault/imagens"),
    RequestPath = "/imagens"
});
app.MapControllers();
app.Run();
