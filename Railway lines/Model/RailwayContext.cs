using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Railway_lines.Model;

public partial class RailwayContext : DbContext
{
    public RailwayContext()
    {
    }

    public RailwayContext(DbContextOptions<RailwayContext> options)
        : base(options)
    {
    }

    public virtual DbSet<BookingDetailsTable> BookingDetailsTables { get; set; }

    public virtual DbSet<CredentialDetailsTable> CredentialDetailsTables { get; set; }

    public virtual DbSet<TrainDetailsTable> TrainDetailsTables { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-16RKJS4\\SQLEXPRESS;Database=Railway;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BookingDetailsTable>(entity =>
        {
            entity.HasKey(e => e.BookingId);

            entity.ToTable("BookingDetailsTable");

            entity.Property(e => e.BookingId)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("Booking_Id");
            entity.Property(e => e.ArrivalTime)
                .HasPrecision(3)
                .HasColumnName("Arrival_Time");
            entity.Property(e => e.AvailableSeats).HasColumnName("Available_Seats");
            entity.Property(e => e.BookingDate).HasColumnName("Booking_Date");
            entity.Property(e => e.BookingTime).HasColumnName("Booking_Time");
            entity.Property(e => e.DepartureTime)
                .HasPrecision(3)
                .HasColumnName("Departure_Time");
            entity.Property(e => e.DestinationStation)
                .IsUnicode(false)
                .HasColumnName("Destination_Station");
            entity.Property(e => e.Fare).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.JourneyDate).HasColumnName("Journey_Date");
            entity.Property(e => e.JourneyDuration)
                .HasPrecision(3)
                .HasColumnName("Journey_Duration");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.SNo)
                .ValueGeneratedOnAdd()
                .HasColumnName("S.No");
            entity.Property(e => e.SourceStation)
                .IsUnicode(false)
                .HasColumnName("Source_Station");
            entity.Property(e => e.TotalSeats).HasColumnName("Total_Seats");
            entity.Property(e => e.TrainId).HasColumnName("Train_Id");
            entity.Property(e => e.TrainName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Train_Name");
            entity.Property(e => e.TrainType)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Train_Type");
            entity.Property(e => e.UserName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("userName");
        });

        modelBuilder.Entity<CredentialDetailsTable>(entity =>
        {
            entity.HasKey(e => e.UserName);

            entity.ToTable("CredentialDetailsTable");

            entity.Property(e => e.UserName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.SNo)
                .ValueGeneratedOnAdd()
                .HasColumnName("S.No");
        });

        modelBuilder.Entity<TrainDetailsTable>(entity =>
        {
            entity.HasKey(e => e.TrainId);

            entity.ToTable("Train_Details Table");

            entity.Property(e => e.TrainId)
                .ValueGeneratedNever()
                .HasColumnName("Train_Id");
            entity.Property(e => e.ArrivalTime)
                .HasPrecision(3)
                .HasColumnName("Arrival_Time");
            entity.Property(e => e.AvailableSeats).HasColumnName("Available_Seats");
            entity.Property(e => e.DepartureTime)
                .HasPrecision(3)
                .HasColumnName("Departure_Time");
            entity.Property(e => e.DestinationStation)
                .IsUnicode(false)
                .HasColumnName("Destination_Station");
            entity.Property(e => e.Fare).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.JourneyDuration)
                .HasPrecision(3)
                .HasColumnName("Journey_Duration");
            entity.Property(e => e.SNo)
                .ValueGeneratedOnAdd()
                .HasColumnName("S.No");
            entity.Property(e => e.SourceStation)
                .IsUnicode(false)
                .HasColumnName("Source_Station");
            entity.Property(e => e.TotalSeats).HasColumnName("Total_Seats");
            entity.Property(e => e.TrainName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Train_Name");
            entity.Property(e => e.TrainType)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Train_Type");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
