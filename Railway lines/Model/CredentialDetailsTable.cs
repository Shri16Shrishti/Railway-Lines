using System;
using System.Collections.Generic;

namespace Railway_lines.Model;

public partial class CredentialDetailsTable
{
    public int SNo { get; set; }

    public string UserName { get; set; } = null!;

    public string Password { get; set; } = null!;
}
