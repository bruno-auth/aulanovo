using Microsoft.EntityFrameworkCore.Migrations;

namespace App.Persistence.Migrations
{
    public partial class Update6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Cpf",
                table: "pessoa",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Telefone",
                table: "pessoa",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cpf",
                table: "pessoa");

            migrationBuilder.DropColumn(
                name: "Telefone",
                table: "pessoa");
        }
    }
}
