using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using ProjectWithDesignDAL;

namespace ProjectWithDesignBAL
{
    public static class DriverBAL
    {
        public static string Driver(string id)
        {
            return new JavaScriptSerializer().Serialize(DriverDAL.Driver(id));
        }
    }
}
