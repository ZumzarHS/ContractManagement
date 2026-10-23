using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Common.Results
{
    public sealed record Error(string Code, string Description, ErrorType Type)
    {
        public static readonly Error None = new(string.Empty, string.Empty, ErrorType.Failure);
    }
}
