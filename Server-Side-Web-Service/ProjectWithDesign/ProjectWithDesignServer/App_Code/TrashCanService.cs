using ProjectWithDesignBAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for TrashCanService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class TrashCanService : System.Web.Services.WebService
{

    public TrashCanService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string Login(string userName, string password)
    {
        return TrashCanBAL.Login(userName, password);
    }

    [WebMethod]
    public string TrashCan(string userName)
    {
        return TrashCanBAL.TrashCan(userName);
    }

    [WebMethod]
    public string UpdateWishTrash(string userName, string wishTrash)
    {
        return TrashCanBAL.UpdateWishTrash(userName, wishTrash);
    }
}
