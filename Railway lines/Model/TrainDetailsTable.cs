using System;
using System.Collections.Generic;

namespace Railway_lines.Model;

public partial class TrainDetailsTable
{
    public int SNo { get; set; }

    public int TrainId { get; set; }

    public string TrainName { get; set; } = null!;

    public string TrainType { get; set; } = null!;

    public string SourceStation { get; set; } = null!;

    public string DestinationStation { get; set; } = null!;

    public TimeOnly DepartureTime { get; set; }

    public TimeOnly ArrivalTime { get; set; }

    public TimeOnly? JourneyDuration { get; set; }

    public int? TotalSeats { get; set; }

    public int AvailableSeats { get; set; }

    public decimal Fare { get; set; }
}
