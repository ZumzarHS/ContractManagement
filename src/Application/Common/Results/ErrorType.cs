using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Common.Results
{
    public enum ErrorType
    {
        Failure,
        Validation,
        NotFound,
        Conflict,
        Forbidden
    }
}
