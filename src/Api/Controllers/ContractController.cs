using Application.Contracts.CreateContract.Commands;
using Microsoft.AspNetCore.Mvc;

namespace ContractManagement.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContractsController : ControllerBase
    {
        private readonly CreateContractCommandHandler _handler;
        public ContractsController(CreateContractCommandHandler handler)
        {
            _handler= handler;
        }

        [HttpPost]
        public async Task<IActionResult> CreateContract(CreateContractCommand command, CancellationToken ct)
        {
            var contractId = await _handler.Handle(command, ct);
            // return CreatedAtAction(nameof(CreateContract), contractId);
            return StatusCode(StatusCodes.Status201Created, contractId);
        }
    }
}
