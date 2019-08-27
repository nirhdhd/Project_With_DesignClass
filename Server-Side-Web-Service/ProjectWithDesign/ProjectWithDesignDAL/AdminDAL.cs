using ProjectWithDesignDAL.Entities;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace ProjectWithDesignDAL
{
    public static class AdminDAL
    {
        static string conStr = null;
        static SqlConnection con = null;
        static SqlCommand comm = null;

        static AdminDAL()
        {
            Configuration config = null;
            string codeBase = Assembly.GetExecutingAssembly().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);
            string path = Uri.UnescapeDataString(uri.Path);

            string exeConfigPath = path;
            try
            {
                config = ConfigurationManager.OpenExeConfiguration(exeConfigPath);
            }
            catch (Exception ex)
            {
                //handle errror here.. means DLL has no sattelite configuration file.
            }

            if (config != null)
            {
                conStr = GetAppSetting(config, "LiveDNS");
            }

            con = new SqlConnection(conStr);
            comm = new SqlCommand();
            comm.Connection = con;
        }

        static string GetAppSetting(Configuration config, string key)
        {
            KeyValueConfigurationElement element = config.AppSettings.Settings[key];
            if (element != null)
            {
                string value = element.Value;
                if (!string.IsNullOrEmpty(value))
                    return value;
            }
            return string.Empty;
        }

        #region Admin Table
        public static Admin Login(string id, string password)
        {
            Admin admin = null;
            try
            {
                comm.CommandText = " SELECT * FROM AdminsTB " +
                                  $" WHERE ID='{id}' AND Password='{password}' ";
                comm.Connection.Open();
                SqlDataReader reader = comm.ExecuteReader();
                if (reader.Read())
                {
                    admin = new Admin()
                    {
                        ID = id,
                        Name = reader["Name"].ToString(),
                        LastName = reader["LastName"].ToString()
                    };
                }
            }
            finally
            {
                CloseConnection();
            }
            return admin;
        }

        public static List<Admin> AdminsList()
        {
            List<Admin> admins = new List<Admin>();
            try
            {
                comm.CommandText = " SELECT * FROM AdminsTB ";
                comm.Connection.Open();
                SqlDataReader reader = comm.ExecuteReader();
                while (reader.Read())
                {
                    admins.Add(new Admin()
                    {
                        ID = reader["ID"].ToString(),
                        Name = reader["Name"].ToString(),
                        LastName = reader["LastName"].ToString(),
                        Password = reader["Password"].ToString()
                    });
                }
            }
            finally
            {
                CloseConnection();
            }
            return admins;
        }

        public static int InsertAdmin(Admin admin)
        {
            int res = 0;
            try
            {
                comm.CommandText = " INSERT INTO AdminsTB(ID, Name, LastName, Password) " +
                                              $" VALUES('{admin.ID}', '{admin.Name}', '{admin.LastName}', '{admin.Password}') ";
                comm.Connection.Open();
                res = comm.ExecuteNonQuery();
            }
            finally
            {
                CloseConnection();
            }
            return res;
        }

        public static int DeleteAdmin(string adminID)
        {
            int res = 0;
            try
            {
                comm.CommandText = " DELETE AdminsTB " +
                                              $" WHERE ID = '{adminID}' ";
                comm.Connection.Open();
                res = comm.ExecuteNonQuery();
            }
            finally
            {
                CloseConnection();
            }
            return res;
        }

        public static int UpdateAdmin(string adminID, Admin admin)
        {
            int res = 0;
            try
            {
                comm.CommandText = " UPDATE AdminsTB " +
                                  $" SET ID='{admin.ID}', Name='{admin.Name}', LastName='{admin.LastName}', Password='{admin.Password}' " +
                                  $" WHERE ID = '{adminID}' ";
                comm.Connection.Open();
                res = comm.ExecuteNonQuery();
            }
            finally
            {
                CloseConnection();
            }
            return res;
        }
        #endregion

        #region Driver Table
        public static List<Driver> DriversList()
        {
            List<Driver> drivers = new List<Driver>();
            try
            {
                comm.CommandText = " SELECT * FROM DriversTB ";
                comm.Connection.Open();
                SqlDataReader reader = comm.ExecuteReader();
                while (reader.Read())
                {
                    drivers.Add(new Driver()
                    {
                        ID = reader["ID"].ToString(),
                        Name = reader["Name"].ToString(),
                        LastName = reader["LastName"].ToString(),
                        Password = reader["Password"].ToString(),
                        Longitude = reader["Longitude"].ToString(),
                        Latitude = reader["Latitude"].ToString()
                    });
                }
            }
            finally
            {
                CloseConnection();
            }
            return drivers;
        }

        public static int InsertDriver(Driver driver)
        {
            int res = 0;
            try
            {
                comm.CommandText = " INSERT INTO DriversTB(ID, Name, LastName,  Password, Longitude, Latitude) " +
                                              $" VALUES('{driver.ID}', '{driver.Name}', '{driver.LastName}', '{driver.Password}', '{driver.Longitude}', '{driver.Latitude}') ";
                comm.Connection.Open();
                res = comm.ExecuteNonQuery();
            }
            finally
            {
                CloseConnection();
            }
            return res;
        }

        public static int DeleteDriver(string driverID)
        {
            int res = 0;
            try
            {
                comm.CommandText = " DELETE DriversTB " +
                                              $" WHERE ID = '{driverID}' ";
                comm.Connection.Open();
                res = comm.ExecuteNonQuery();
            }
            finally
            {
                CloseConnection();
            }
            return res;
        }

        public static int UpdateDriver(string driverID, Driver driver)
        {
            int res = 0;
            try
            {
                comm.CommandText = " UPDATE DriversTB " +
                                              $" SET ID='{driver.ID}', Name='{driver.Name}', LastName='{driver.LastName}', Password='{driver.Password}', Longitude='{driver.Longitude}', Latitude='{driver.Latitude}' " +
                                              $" WHERE ID = '{driverID}' ";
                comm.Connection.Open();
                res = comm.ExecuteNonQuery();
            }
            finally
            {
                CloseConnection();
            }
            return res;
        }
        #endregion

        #region Trash Can Table
        public static List<TrashCan> TrashCansList()
        {
            List<TrashCan> trashCans = new List<TrashCan>();
            try
            {
                comm.CommandText = " SELECT * FROM TrashCansTB ";
                comm.Connection.Open();
                SqlDataReader reader = comm.ExecuteReader();
                while (reader.Read())
                {
                    trashCans.Add(new TrashCan()
                    {
                        UserName = reader["UserName"].ToString(),
                        LastName = reader["LastName"].ToString(),
                        Password = reader["Password"].ToString(),
                        Latitude = reader["Latitude"].ToString(),
                        Longitude = reader["Longitude"].ToString(),
                        CurrentTrash = reader["CurrentTrash"].ToString(),
                        WishTrash = reader["WishTrash"].ToString()
                    });
                }
            }
            finally
            {
                CloseConnection();
            }
            return trashCans;
        }

        public static int InsertTrashCan(TrashCan trashCan)
        {
            int res = 0;
            try
            {
                comm.CommandText = " INSERT INTO TrashCansTB(UserName, LastName, Password, Longitude, Latitude, CurrentTrash, WishTrash) " +
                                              $" VALUES('{trashCan.UserName}', '{trashCan.LastName}','{trashCan.Password}', '{trashCan.Longitude}', '{trashCan.Latitude}', '{trashCan.CurrentTrash}', '{trashCan.WishTrash}') ";
                comm.Connection.Open();
                res = comm.ExecuteNonQuery();
            }
            finally
            {
                CloseConnection();
            }
            return res;
        }

        public static int DeleteTrashCan(string trashCanUserName)
        {
            int res = 0;
            try
            {
                comm.CommandText = " DELETE TrashCansTB " +
                                              $" WHERE UserName = '{trashCanUserName}' ";
                comm.Connection.Open();
                res = comm.ExecuteNonQuery();
            }
            finally
            {
                CloseConnection();
            }
            return res;
        }

        public static int UpdateTrashCan(string trashCanUserName, TrashCan trashCan)
        {
            int res = 0;
            try
            {
                comm.CommandText = " UPDATE TrashCansTB " +
                                              $" SET UserName='{trashCan.UserName}', LastName='{trashCan.LastName}',Password='{trashCan.Password}', Longitude='{trashCan.Longitude}', Latitude='{trashCan.Latitude}', CurrentTrash='{trashCan.CurrentTrash}', WishTrash='{trashCan.WishTrash}' " +
                                              $" WHERE UserName = '{trashCanUserName}' ";
                comm.Connection.Open();
                res = comm.ExecuteNonQuery();
            }
            finally
            {
                CloseConnection();
            }

            return res;
        }
        #endregion


        private static void CloseConnection()
        {
            if (comm.Connection.State == ConnectionState.Open)
                comm.Connection.Close();
        }
    }
}
