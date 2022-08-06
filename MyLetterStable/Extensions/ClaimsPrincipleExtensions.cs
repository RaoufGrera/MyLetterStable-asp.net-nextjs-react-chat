using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace MyLetterStable.Extensions
{
    public static class ClaimsPrincipleExtensions
    {
        public static string GetUsername(this ClaimsPrincipal user)
        {
            return user.FindFirst(JwtRegisteredClaimNames.Name)?.Value;
        }

        public static int GetUserId(this ClaimsPrincipal user)
        {
            return int.Parse(user.FindFirst(JwtRegisteredClaimNames.NameId)?.Value);
        }
    }
}