using ProjectWithDesignDAL;
using ProjectWithDesignDAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;

namespace ProjectWithDesignBAL
{
    public static class AdminBAL
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

        #region Admin Table
        public static string Login(string id, string password)
        {
            return new JavaScriptSerializer().Serialize(AdminDAL.Login(id, GenerateSHA512String(password)));
        }

        public static string AdminsList()
        {
            return new JavaScriptSerializer().Serialize(AdminDAL.AdminsList());
        }

        public static string InsertAdmin(string id, string name, string lastName, string password)
        {
            var existingAdmin = AdminDAL.AdminsList().FirstOrDefault(val => val.ID == id);
            if (existingAdmin == null)
            {
                Admin admin = new Admin
                {
                    ID = id,
                    Name = name,
                    LastName = lastName,
                    Password = GenerateSHA512String(password)
                };
                return new JavaScriptSerializer().Serialize(AdminDAL.InsertAdmin(admin));
            }
            return "0";
        }

        public static string DeleteAdmin(string adminID)
        {
            return new JavaScriptSerializer().Serialize(AdminDAL.DeleteAdmin(adminID));
        }

        public static string UpdateAdmin(string lastID, string newID, string name, string lastName, string password)
        {
            var lastAdminValues = AdminDAL.AdminsList().FirstOrDefault(val => val.ID == lastID);
            Admin a = new Admin
            {
                ID = newID,
                Name = name,
                LastName = lastName,
                Password = password != "" ? GenerateSHA512String(password) : lastAdminValues.Password
            };
            return new JavaScriptSerializer().Serialize(AdminDAL.UpdateAdmin(lastID, a));
        }
        #endregion

        #region Driver Table
        public static string DriversList()
        {
            return new JavaScriptSerializer().Serialize(AdminDAL.DriversList());
        }

        public static string InsertDriver(string id, string name, string lastName, string password, string longitude, string latitude)
        {
            Driver d = new Driver
            {
                ID = id,
                Name = name,
                LastName = lastName,
                Password = GenerateSHA512String(password),
                Longitude = longitude,
                Latitude = latitude
            };
            return new JavaScriptSerializer().Serialize(AdminDAL.InsertDriver(d));
        }

        public static string DeleteDriver(string driverID)
        {
            return new JavaScriptSerializer().Serialize(AdminDAL.DeleteDriver(driverID));
        }

        public static string UpdateDriver(string lastID, string newID, string name, string lastName, string password, string longitude, string latitude)
        {
            var lastDeiverValues = AdminDAL.DriversList().FirstOrDefault(val => val.ID == lastID);
            Driver d = new Driver
            {
                ID = newID,
                Name = name,
                LastName = lastName,
                Password = password != "" ? GenerateSHA512String(password) : lastDeiverValues.Password,
                Longitude = longitude,
                Latitude = latitude
            };
            return new JavaScriptSerializer().Serialize(AdminDAL.UpdateDriver(lastID, d));
        }
        #endregion

        #region Trash Can Table
        public static string TrashCansList()
        {
            return new JavaScriptSerializer().Serialize(AdminDAL.TrashCansList());
        }

        public static string InsertTrashCan(string userName, string lastName, string password, string longitude, string latitude, string currentTrash, string wishTrash)
        {
            TrashCan tc = new TrashCan
            {
                UserName = userName,
                LastName = lastName,
                Password = GenerateSHA512String(password),
                Longitude = longitude,
                Latitude = latitude,
                CurrentTrash = currentTrash,
                WishTrash = wishTrash
            };
            return new JavaScriptSerializer().Serialize(AdminDAL.InsertTrashCan(tc));
        }

        public static string DeleteTrashCan(string trashCanUserName)
        {
            return new JavaScriptSerializer().Serialize(AdminDAL.DeleteTrashCan(trashCanUserName));
        }

        public static string UpdateTrashCan(string lastUserName, string newUserName, string lastName, string password, string longitude, string latitude, string currentTrash, string wishTrash)
        {
            var lastTrashCanValues = AdminDAL.TrashCansList().FirstOrDefault(val => val.UserName == lastUserName);
            TrashCan tc = new TrashCan
            {
                UserName = newUserName,
                LastName = lastName,
                Password = password != "" ? GenerateSHA512String(password) : lastTrashCanValues.Password,
                Longitude = longitude,
                Latitude = latitude ,
                CurrentTrash = currentTrash,
                WishTrash = wishTrash
            };
            return new JavaScriptSerializer().Serialize(AdminDAL.UpdateTrashCan(lastUserName, tc));
        }
        #endregion
    }
}
