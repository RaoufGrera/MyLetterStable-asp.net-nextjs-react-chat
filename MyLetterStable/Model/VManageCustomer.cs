using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyLetterStable.Model
{
    public class VManageCustomer
    {

        public int CustomerId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }

        public string PhonNumber1 { get; set; }

        public int? BillsNumber { get; set; }
        public string EmailAddress { get; set; }

        public string TypeBox { get; set; }
        public long? NumberBox { get; set; }
        public string DateBills { get; set; }
        public string ExpiretDate { get; set; }
        public string TotalPrice { get; set; }

        public int TypeBoxId { get; set; }
        public DateTime DateStartRent { get; set; }
        public string BookedExpret { get; set; }

        
        public int RentYears { get; set; }
        public int? BoxId { get; set; }

        public int? PriceKey { get; set; }
        public bool IsActive { get; set; }
        public bool IsBooked { get; set; }

        public string State { get; set; }

        public string IdentityNumber { get; set; }

        public int? CustomerIdentityId { get; set; }
        public int? CustomerTypeId { get; set; }
        public int? CustomerJobsId { get; set; }

        public int? PayTypeId { get; set; }

        public int? BillsId { get; set; }

        public int? OfficeId { get; set; }

        public int? TypeKey { get; set; }

        public string OfficeName { get; set; }
    }
}
