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
    public static class DriverDAL
    {
        static string conStr = null;
        static SqlConnection con = null;
        static SqlCommand comm = null;

        static DriverDAL()
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

        public static Driver Driver(string id)
        {
            Driver driver = null;
            try
            {
                comm.CommandText = " SELECT * FROM DriversTB " +
                                  $" WHERE ID='{id}' ";
                comm.Connection.Open();
                SqlDataReader reader = comm.ExecuteReader();
                if (reader.Read())
                {
                    driver = new Driver()
                    {
                        ID = reader["ID"].ToString(),
                        Name = reader["Name"].ToString(),
                        LastName = reader["LastName"].ToString(),
                        Latitude = reader["Latitude"].ToString(),
                        Longitude = reader["Longitude"].ToString(),

                    };
                }
            }
            finally
            {
                CloseConnection();
            }
            return driver;
        }

        private static void CloseConnection()
        {
            if (comm.Connection.State == ConnectionState.Open)
                comm.Connection.Close();
        }
    }
}
