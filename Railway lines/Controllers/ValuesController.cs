using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Railway_lines.Model;

namespace Railway_lines.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        #region Properties
        RailwayContext _db = new RailwayContext();

        #endregion

        #region Constructor
        public ValuesController() { 
        
        }

        #endregion

        #region Method
        [HttpGet]
        [Route("GetAllTrainDetails")]

        public ActionResult GetAllTrainDetails() {
            var res = _db.TrainDetailsTables.ToList();
            return Ok(res);
        }
        [HttpGet]
        [Route("GetByTrainName")]

        public ActionResult GetByTrainName(string trainName)
        {
            var res = _db.TrainDetailsTables.Where(x => x.TrainName == trainName).ToList();
            return Ok(res);
        }
        //[HttpGet]
        //[Route("GetTrainsByRoute")]
        //public ActionResult GetTrainsByRoute(string sourceStation, string destinationStation)
        //{
        //    var trains = _db.TrainDetailsTables.Where(t => t.SourceStation == sourceStation && t.DestinationStation == destinationStation).ToList();
         
        //    if (!trains.Any())
        //    {
        //        return NotFound("No trains found for the given route.");
        //    }

        //    return Ok(trains);
        //}
        [HttpGet]
        [Route("GetTrainsByRoute")]
        public ActionResult GetTrainsByRoute(string sourceStation, string destinationStation)
        {
            var res = _db.TrainDetailsTables.Where(k => k.SourceStation == sourceStation).ToList();
            var res1 = _db.TrainDetailsTables.Where(k => k.DestinationStation == destinationStation).ToList();
            return Ok(res);
        }

        //[HttpGet]
        //[Route("GetTrainsByRoute")]
        //public ActionResult GetTrainsByRoute(string sourceStation,  string destinationStation)
        //{
        //    var trains = _db.TrainDetailsTables
        //                    .Where(t => t.SouceStation == sourceStation && t.DestinationStation == destinationStation)
        //                    .ToList();

        //    if (!trains.Any())
        //    {
        //        return NotFound("No trains found for the given route.");
        //    }

        //    return Ok(trains);
        //}


        [HttpPost]
        [Route("AddTrainDetails")]

        public ActionResult AddTrainDetails(TrainDetailsTable trainDetails)
        {
             _db.TrainDetailsTables.Add(trainDetails);
            _db.SaveChanges();
            return Ok(true);
        }

        [HttpDelete]
        [Route("DeleteById")]
        public ActionResult DeleteById(int id)
        {
            var res = _db.TrainDetailsTables.FirstOrDefault(x => x.TrainId == id);

            if (res == null)
            {
                return NotFound("Train not found");
            }

            _db.TrainDetailsTables.Remove(res);
            _db.SaveChanges();

            return Ok("Train deleted successfully");
        }


        [HttpPut]
        [Route("UpdateTrainDetails")]
        public ActionResult UpdateTrainDetails(TrainDetailsTable trainDetails)
        {
            var res = _db.TrainDetailsTables.FirstOrDefault(x => x.TrainId == trainDetails.TrainId);

            if (res == null)
            {
                return NotFound("Train not found");
            }

            res.AvailableSeats = trainDetails.AvailableSeats;
            res.ArrivalTime = trainDetails.ArrivalTime;
            res.DepartureTime = trainDetails.DepartureTime;

            _db.SaveChanges(); 

            return Ok("Train details updated successfully");
        }

        #endregion

    }
}
