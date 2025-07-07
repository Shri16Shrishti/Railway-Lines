using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Railway_lines.ExternalModel;
using Railway_lines.Model;

namespace Railway_lines.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CredentialController : Controller
    {
        #region Properties
        RailwayContext _db = new RailwayContext();

        #endregion

        #region Constructor
        public CredentialController()
        {

        }

        #endregion



        #region Method

        [HttpGet]
        [Route("GetAllCredentialDetails")]

        public ActionResult GetAllCredentialDetails()
        {
            var res = _db.CredentialDetailsTables.ToList();
            return Ok(res);
        }



        [HttpPost]
        [Route("RegisterPassenger")]
        public ActionResult RegisterPassenger(CredentialDetailsTable userDetails)
        {

            try
            {
            
            if (userDetails == null)
            {
                return BadRequest("Invalid data.");
            }
            CredentialDetailsTable res = new CredentialDetailsTable
            {
                UserName = userDetails.UserName,
                Password = userDetails.Password
            };

            _db.Entry(res).Property(x => x.SNo).IsModified = false;

            _db.CredentialDetailsTables.Add(res);
            _db.SaveChanges();

            //return Ok(new { res.UserName, res.Password });
            return Ok(new
            {
                success = true,
                message = "User registered successfully",
                data = new
                {
                    res.UserName,
                    res.Password
                }
            });
            }
            catch (Exception e)
            {
                return Ok(e.Message);
            }
        }


        [HttpPost]
        [Route("ValidateCredential")]
        public ActionResult ValidateCredential(CredentialDetailsTable userDetails)
        {
            var res = _db.CredentialDetailsTables.FirstOrDefault(x => x.UserName == userDetails.UserName && x.Password == userDetails.Password);
            if (res != null) {
                return Ok(true);
            }
            else
            {
                return Ok(false);
            }
        }


        [HttpPut]
        [Route("ResetPassword")]
        public ActionResult ResetPassword(changePasswordModel userDetails)
        {
            var res = _db.CredentialDetailsTables.FirstOrDefault(x => x.UserName == userDetails.UserName && x.Password == userDetails.OldPassword);

            if (res == null)
            {
                return NotFound("Details not found");
            }
            if (res.SNo != userDetails.SNo || res.UserName != userDetails.UserName)
            {
                return BadRequest("Cannot update Username and Sno");
            }
            res.Password = userDetails.NewPassword;

            _db.Entry(res).Property(x => x.Password).IsModified = true;
            _db.Entry(res).Property(x => x.SNo).IsModified = false;
            _db.Entry(res).Property(x => x.UserName).IsModified = false;

            _db.SaveChanges();

            return Ok("Password updated successfully");
        }


        #endregion
    }
}
