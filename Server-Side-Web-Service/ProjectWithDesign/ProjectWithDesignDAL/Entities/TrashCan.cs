using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectWithDesignDAL.Entities
{
    public class TrashCan
    {
        public string UserName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }
        public string CurrentTrash { get; set; }
        public string WishTrash { get; set; }
    }
}
