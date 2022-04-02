using EmailWatcher.Database.Model;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;

namespace EmailWatcher.Database
{
  public class MySQLExecutor : ISQLExecutor
  {
    private const string _nameSubstitutes = "[Panggilan]";
    private readonly MySqlConnection _dbConnection;

    public MySQLExecutor(string connectionString)
    {
      _dbConnection = new MySqlConnection(connectionString);
    }

    private string TextProcessing(string raw, string substituteStr)
    {
      return raw.Replace(_nameSubstitutes, substituteStr, true, null);
    }

    public bool Connect()
    {
      try
      {
        _dbConnection.Open();
        return true;
      }
      catch
      {
        return false;
      }
    }

    public Credential GetSenderCredential()
    {
      MySqlCommand command;
      Credential result = null;

      try
      {
        string query = string.Format("select * from credential where type = '{0}' limit 0,1;", EnumCredential.Sender.ToString());
        //Console.WriteLine(query);
        command = new MySqlCommand(query, _dbConnection)
        {
          CommandType = CommandType.Text
        };
        MySqlDataReader dr = command.ExecuteReader();

        while (dr.Read())
        {
          if (result == null)
            result = new Credential();

          result.Username = dr["username"].ToString();
          result.Password = dr["password"].ToString();
        }

        dr.Close();
        return result;
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
        return null;
      }
    }

    public IList<EmailParameter> RetrieveNewOutboxEmail()
    {
      MySqlCommand command;
      IList<EmailParameter> result = null;

      try
      {
        string query = string.Format(
          "select a.* from outbox a " +
          "where a.status = {0};",
          ((int)EnumOutboxStatus.InProgress)
        );
        Console.WriteLine(query);
        command = new MySqlCommand(query, _dbConnection)
        {
          CommandType = CommandType.Text
        };
        MySqlDataReader dr = command.ExecuteReader();

        while (dr.Read())
        {
          if (result == null)
            result = new List<EmailParameter>();

          EmailParameter row = new EmailParameter()
          {
            OutboxId = dr.GetInt64("id"),
            UserId = dr.GetInt64("user_id"),
            Destination = dr["destination"].ToString(),
            Subject = dr["title"].ToString(),
            Body = dr["message"].ToString()
          };

          result.Add(row);
        }

        dr.Close();
        return result;
      }
      catch(Exception ex)
      {
        Console.WriteLine(ex.Message);
        return null;
      }
    }

    public bool UpdateOutboxStatus(long outboxId, Credential cred, EnumOutboxStatus status)
    {
      try
      {
        int result;
        MySqlTransaction transaction = _dbConnection.BeginTransaction();

        try
        {
          string query = string.Format("update outbox set status = {0}, usr_upd = 'system', dtm_upd = '{1}' where id = {2};", ((int)status), DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"), outboxId);
          MySqlCommand command = new MySqlCommand(query, _dbConnection, transaction);
          result = command.ExecuteNonQuery();
          transaction.Commit();

          if (result == 0)
            return false;
        }
        catch (Exception ex)
        {
          transaction.Rollback();
          Console.WriteLine(ex.Message);
          return false;
        }

        return true;
      }
      catch(Exception ex)
      {
        Console.WriteLine(ex.Message);
        return false;
      }
    }

    public bool Disconnect()
    {
      try
      {
        _dbConnection.Close();
        return true;
      }
      catch
      {
        return false;
      }
    }

    public void Dispose()
    {
      _dbConnection.Dispose();
    }
  }
}
