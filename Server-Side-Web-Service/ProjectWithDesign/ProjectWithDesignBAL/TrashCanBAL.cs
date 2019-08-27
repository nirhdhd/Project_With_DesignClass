using ProjectWithDesignDAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;

namespace ProjectWithDesignBAL
{
    public static class TrashCanBAL
    {
        private static string GenerateSHA512String(string inputString)
        {
            SHA512 sha512 = SHA512Managed.Create();
            byte[] bytes = Encoding.UTF8.GetBytes(inputString);
            byte[] hash = sha512.ComputeHash(bytes);
            return GetStringFromHash(hash);
        }

        private static string GetStringFromHash(byte[] hash)
        {
            StringBuilder result = new StringBuilder();

            for (int i = 0; i < hash.Length; i++)
            {
                result.Append(hash[i].ToString("X2"));
            }
            return result.ToString();
        }

        public static string Login(string userName, string password)
        {
            return new JavaScriptSerializer().Serialize(TrashCanDAL.Login(userName, GenerateSHA512String(password)));
        }

        public static string TrashCan(string userName)
        {
            return new JavaScriptSerializer().Serialize(TrashCanDAL.TrashCan(userName));
        }

        public static string UpdateWishTrash(string userName, string wishTrash)
        {
            return new JavaScriptSerializer().Serialize(TrashCanDAL.UpdateWishTrash(userName, wishTrash));
        }
    }
}
