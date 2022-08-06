using Microsoft.AspNetCore.Mvc;
using SystemData;
namespace MyLetterStable.Controllers.v1
{

    [Route("v1/[controller]")]

    public class FireController : Controller
    {
       

            protected SystemContext _context;
            public FireController(SystemContext context)
            {
                _context = context;
            }


           

        
    }
}
