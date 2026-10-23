using Application.Common.Results;

namespace ContractManagement.Api.Common;

public static class ResultExtensions
{
    public static IResult ToProblemDetails(this Result result)
    {
        if (result.IsSuccess)
        {
            throw new InvalidOperationException(
                "Can't convert a success result to a problem response.");
        }

        return Results.Problem(
            statusCode: result.Error.Type switch
            {
                ErrorType.Validation => StatusCodes.Status400BadRequest,
                ErrorType.NotFound => StatusCodes.Status404NotFound,
                ErrorType.Conflict => StatusCodes.Status409Conflict,
                ErrorType.Forbidden => StatusCodes.Status403Forbidden,
                _ => StatusCodes.Status500InternalServerError
            },
            title: result.Error.Code,
            detail: result.Error.Description);
    }
}