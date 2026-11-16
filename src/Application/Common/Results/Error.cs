using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Common.Results
{
    public sealed record Error(string Code, string Description, ErrorType Type)
    {
        public static readonly Error None = new(string.Empty, string.Empty, ErrorType.Failure);
        public static readonly Error NotFound =
        new("General.NotFound", "The requested resource was not found.", ErrorType.NotFound);

        public static readonly Error Validation =
            new("General.Validation", "A validation error occurred.", ErrorType.Validation);

        public static readonly Error Failure =
            new("General.Failure", "An unexpected error occurred.", ErrorType.Failure);
    }
}
