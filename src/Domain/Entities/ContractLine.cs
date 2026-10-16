using ContractManagement.Domain.Enums;

namespace ContractManagement.Domain.Entities
{
    public class ContractLine
    {
        public Guid ContractLineId { get; private set; }
        public string? Producer { get; private set; }
        public string? Model { get; private set; }
        public decimal Price { get; private set; }
        public int? Quantity { get; private set; }
        public string? Description { get; private set; }
        public decimal? InitialAmount { get; private set; }
        public int? DeliveryFrequencyInterval { get; private set; }
        public FrequencyUnit? DeliveryFrequencyUnit { get; private set; }
        public int PaymentFrequencyInterval { get; private set; }
        public FrequencyUnit PaymentFrequencyUnit { get; private set; }

        public Guid ContractId { get; private set; }
        public Contract Contract { get; private set; } = null!;

        public Guid CatalogItemId { get; private set; }
        public CatalogItem CatalogItem { get; private set; } = null!;

        private ContractLine() { }

        public static ContractLine Create(
            Guid catalogItemId,
            string? producer,
            string? model,
            decimal price,
            int? quantity,
            string? description,
            decimal? initialAmount,
            int? deliveryFrequencyInterval,
            FrequencyUnit? deliveryFrequencyUnit,
            int paymentFrequencyInterval,
            FrequencyUnit paymentFrequencyUnit)
        {
            if (catalogItemId == Guid.Empty)
                throw new ArgumentException("CatalogItemId is required.");

            if (price < 0)
                throw new ArgumentException("Price cannot be negative.");

            if (quantity.HasValue && quantity.Value <= 0)
                throw new ArgumentException("Quantity must be positive.");

            if (paymentFrequencyInterval <= 0)
                throw new ArgumentException(
                    "Payment frequency interval must be positive.");

            return new ContractLine
            {
                ContractLineId = Guid.NewGuid(),
                CatalogItemId = catalogItemId,
                Producer = producer,
                Model = model,
                Price = price,
                Quantity = quantity,
                Description = description,
                InitialAmount = initialAmount,
                DeliveryFrequencyInterval = deliveryFrequencyInterval,
                DeliveryFrequencyUnit = deliveryFrequencyUnit,
                PaymentFrequencyInterval = paymentFrequencyInterval,
                PaymentFrequencyUnit = paymentFrequencyUnit
            };
        }
        internal void SetContract(Contract contract)
        {
            Contract = contract;
            ContractId = contract.ContractId;
        }
    }
}