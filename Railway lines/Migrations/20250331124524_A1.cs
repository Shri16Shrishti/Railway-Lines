using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Railway_lines.Migrations
{
    /// <inheritdoc />
    public partial class A1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BookingDetailsTable",
                columns: table => new
                {
                    Booking_Id = table.Column<int>(type: "int", nullable: false),
                    Train_Id = table.Column<int>(type: "int", nullable: false),
                    Customer_Id = table.Column<int>(type: "int", nullable: false),
                    Booking_Date = table.Column<DateOnly>(type: "date", nullable: false),
                    Booking_Time = table.Column<DateOnly>(type: "date", nullable: false),
                    Journey_Date = table.Column<DateOnly>(type: "date", nullable: false),
                    Source_Station_Id = table.Column<int>(type: "int", nullable: false),
                    Destination_Station_Id = table.Column<int>(type: "int", nullable: false),
                    Class = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    Seat_Number = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: false),
                    Fare = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Booking_Status = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookingDetailsTable", x => x.Booking_Id);
                });

            migrationBuilder.CreateTable(
                name: "Train_DetailsTable",
                columns: table => new
                {
                    Train_Id = table.Column<int>(type: "int", nullable: false),
                    Train_Name = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    Train_Type = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    Souce_Station_Id = table.Column<int>(type: "int", nullable: true),
                    Destination_Station_Id = table.Column<int>(type: "int", nullable: true),
                    Departure_Time = table.Column<TimeOnly>(type: "time(3)", precision: 3, nullable: false),
                    Arrival_Time = table.Column<TimeOnly>(type: "time(3)", precision: 3, nullable: false),
                    Journey_Duration = table.Column<TimeOnly>(type: "time(3)", precision: 3, nullable: true),
                    Total_Seats = table.Column<int>(type: "int", nullable: true),
                    Available_Seats = table.Column<int>(type: "int", nullable: false),
                    Fare = table.Column<decimal>(type: "decimal(10,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Train_DetailsTable", x => x.Train_Id);
                });

            migrationBuilder.CreateTable(
                name: "UserNameTable",
                columns: table => new
                {
                    Password = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    UserName = table.Column<string>(type: "varchar(max)", unicode: false, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserNameTable", x => x.Password);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookingDetailsTable");

            migrationBuilder.DropTable(
                name: "Train_DetailsTable");

            migrationBuilder.DropTable(
                name: "UserNameTable");
        }
    }
}
