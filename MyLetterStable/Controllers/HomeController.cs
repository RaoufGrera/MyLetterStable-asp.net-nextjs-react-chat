using Microsoft.AspNetCore.Mvc;

namespace MyLetterStable.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return new RedirectResult("~/swagger/");
        }
    }
}
