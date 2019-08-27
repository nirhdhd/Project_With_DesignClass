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
    public static class TrashCanDAL
    {
        static string conStr = null;
        static SqlConnection con = null;
        static SqlCommand comm = null;

        static TrashCanDAL()
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

        public static int Login(string userName, string password)
        {
            int res = 0;
            try
            {
                comm.CommandText = " SELECT * FROM TrashCansTB " +
                                  $" WHERE UserName='{userName}' AND Password='{password}' ";
                comm.Connection.Open();
                SqlDataReader reader = comm.ExecuteReader();
                if (reader.Read()) res = 1;
            }
            finally
            {
                CloseConnection();
            }
            return res;
        }

        public static TrashCan TrashCan(string userName)
        {
            TrashCan trashCan = null;
            try
            {
                comm.CommandText = " SELECT * FROM TrashCansTB " +
                                  $" WHERE UserName='{userName}' ";
                comm.Connection.Open();
                SqlDataReader reader = comm.ExecuteReader();
                if (reader.Read())
                {
                    trashCan = new TrashCan()
                    {
                        UserName = reader["UserName"].ToString(),
                        LastName = reader["LastName"].ToString(),
                        Latitude = reader["Latitude"].ToString(),
                        Longitude = reader["Longitude"].ToString(),
                        CurrentTrash = reader["CurrentTrash"].ToString(),
                        WishTrash = reader["WishTrash"].ToString(),
                    };
                }
            }
            finally
            {
                CloseConnection();
            }
            return trashCan;
        }

        public static int UpdateWishTrash(string userName, string wishTrash)
        {
            int res = 0;
            try
            {
                comm.CommandText = " UPDATE TrashCansTB " +
                                  $" SET WishTrash='{wishTrash}' " +
                                  $" WHERE UserName = '{userName}' ";
                comm.Connection.Open();
                res = comm.ExecuteNonQuery();
            }
            finally
            {
                CloseConnection();
            }
            return res;
        }

        private static void CloseConnection()
        {
            if (comm.Connection.State == ConnectionState.Open)
                comm.Connection.Close();
        }
    }
}
