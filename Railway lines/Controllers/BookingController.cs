using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Railway_lines.Model;

namespace Railway_lines.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : Controller
    {
        #region Properties
        RailwayContext _db = new RailwayContext();

        #endregion

        #region Constructor
        public BookingController()
        {

        }

        #endregion

        #region Method
        [HttpGet]
        [Route("GetAllBookingDetails")]

        public ActionResult GetAllBookingDetails()
        {
            var res = _db.BookingDetailsTables.ToList();
            return Ok(res);
        }

        [HttpGet]
        [Route("GetByBookingId")]
        public ActionResult GetByBookingId(string bookingId)
        {
            var res = _db.BookingDetailsTables
                         .Where(x => x.BookingId == bookingId)
                         .ToList();
            if (res == null || res.Count == 0)
            {
                return NotFound("Booking not found.");
            }

            return Ok(res);
        }

        [HttpGet]
        [Route("GetByBookingDate")]
        public ActionResult GetByBookingDate(DateOnly bookingDate) 
        {
            var res = _db.BookingDetailsTables.Where(x => x.BookingDate == bookingDate).ToList();
            return Ok(res);
        }

        [HttpPost]
        [Route("AddBookingDetails")]

        public ActionResult AddBookingDetails(BookingDetailsTable bookingDetails)
        {
            if (string.IsNullOrEmpty(bookingDetails.UserName))
            {
                return BadRequest("User must be logged in to book a ticket.");
            }

            _db.BookingDetailsTables.Add(bookingDetails);
            bookingDetails.AvailableSeats -= 1;
            _db.SaveChanges();
            
            return Ok(true);
        }

        [HttpDelete]
        [Route("DeleteById")]
        public ActionResult DeleteById(string id)
        {
            var res = _db.BookingDetailsTables.FirstOrDefault(x => x.BookingId == id);

            if (res == null)
            {
                return NotFound("Booking not found");
            }

            _db.BookingDetailsTables.Remove(res);
            _db.SaveChanges();

            return Ok("Booking deleted successfully");
        }

        [HttpPut]
        [Route("UpdateBookingDetails")]
        public ActionResult UpdateBookingDetails(BookingDetailsTable bookingDetails)
        {
            var res = _db.BookingDetailsTables.FirstOrDefault(x => x.BookingId == bookingDetails.BookingId);

            if (res == null)
            {
                return NotFound("Booking not found");
            }
            res.DepartureTime = bookingDetails.DepartureTime;
            res.ArrivalTime = bookingDetails.ArrivalTime;
            res.JourneyDuration = bookingDetails.JourneyDuration;
            res.AvailableSeats = bookingDetails.AvailableSeats;

            _db.SaveChanges();

            return Ok(new { message = "Booking details updated successfully" });
        }

        [HttpGet]
        [Route("GetBookingsByUsername")]
        public ActionResult GetBookingsByUsername(string userName)
        {
            if (string.IsNullOrEmpty(userName))
                return BadRequest("UserName is required");

            var userExists = _db.CredentialDetailsTables.Any(u => u.UserName == userName);

            if (!userExists)
                return NotFound("User not found");

            var bookings = _db.BookingDetailsTables
                            .Where(b => b.UserName == userName)
                            .ToList();

            return Ok(bookings);
        }








        #endregion

    }
}
