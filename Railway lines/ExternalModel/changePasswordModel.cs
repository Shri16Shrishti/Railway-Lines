namespace Railway_lines.ExternalModel
{
    public class changePasswordModel
    {

        public int SNo { get; set; }

        public string UserName { get; set; } = null!;

        public string OldPassword { get; set; } = null!;
        public string NewPassword { get; set; } = null!;
    }
}
