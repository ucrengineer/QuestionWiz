using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace question_wiz_api.Security.Interface
{
    public interface ISecurityHelper
    {
        string ComputeHash(byte[] bytesToHash, byte[] salt);

        string GenerateSalt();

    }
}
