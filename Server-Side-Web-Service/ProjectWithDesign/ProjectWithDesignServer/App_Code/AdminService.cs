using ProjectWithDesignBAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for AdminService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class AdminService : System.Web.Services.WebService
{

    public AdminService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }


    #region Admin Table
    [WebMethod]
    public string Login(string id, string password)
    {
        return AdminBAL.Login(id, password);
    }

    [WebMethod]
    public string AdminsList()
    {
        return AdminBAL.AdminsList();
    }

    [WebMethod]
    public string InsertAdmin(string id, string name, string lastName, string password)
    {
        return AdminBAL.InsertAdmin(id, name, lastName, password);
    }

    [WebMethod]
    public string DeleteAdmin(string id)
    {
        return AdminBAL.DeleteAdmin(id);
    }

    [WebMethod]
    public string UpdateAdmin(string lastID, string id, string name, string lastName, string password)
    {
        return AdminBAL.UpdateAdmin(lastID, id, name, lastName, password);
    }
    #endregion

    #region Driver Table
    [WebMethod]
    public string DriversList()
    {
        return AdminBAL.DriversList();
    }

    [WebMethod]
    public string InsertDriver(string id, string name, string lastName, string password, string longitude, string latitude)
    {
        return AdminBAL.InsertDriver(id, name, lastName, password, longitude, latitude);
    }

    [WebMethod]
    public string DeleteDriver(string id)
    {
        return AdminBAL.DeleteDriver(id);
    }

    [WebMethod]
    public string UpdateDriver(string lastID, string id, string name, string lastName, string password, string longitude, string latitude)
    {
        return AdminBAL.UpdateDriver(lastID, id, name, lastName, password, longitude, latitude);
    }
    #endregion

    #region Trash Can Table
    [WebMethod]
    public string TrashCansList()
    {
        return AdminBAL.TrashCansList();
    }

    [WebMethod]
    public string InsertTrashCan(string userName, string lastName, string password, string longitude, string latitude, string currentTrash, string wishTrash)
    {
        return AdminBAL.InsertTrashCan(userName, lastName, password, longitude, latitude, currentTrash, wishTrash);
    }

    [WebMethod]
    public string DeleteTrashCan(string userName)
    {
        return AdminBAL.DeleteTrashCan(userName);
    }

    [WebMethod]
    public string UpdateTrashCan(string lastUserName, string userName, string lastName, string password, string longitude, string latitude, string currentTrash, string wishTrash)
    {
        return AdminBAL.UpdateTrashCan(lastUserName, userName, lastName, password, longitude, latitude, currentTrash, wishTrash);
    }
    #endregion
}
