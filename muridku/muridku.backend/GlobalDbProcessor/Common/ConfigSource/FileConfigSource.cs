using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml;
using System.Xml.Linq;

namespace Common.ConfigSource
{
    internal class FileConfigSource : IConfigSource
    {
        private readonly ConfigFileType _fileType;
        private readonly IDictionary<string, object> _configs;

        public FileConfigSource( string fileName, ConfigFileType fileType )
        {
            _fileType = fileType;
            _configs = new Dictionary<string, object>();
            switch( _fileType )
            {
            case ConfigFileType.Xml:
                XmlDocument tmpXmlDoc = new XmlDocument();
                tmpXmlDoc.Load( fileName );
                XDocument xmlDocument = XDocument.Parse( tmpXmlDoc.InnerXml );

                foreach( XElement element in xmlDocument.Descendants( "member" ) )
                _configs.Add( element.Attribute( "key" ).Value, element.Attribute( "value" ).Value );
                break;

            case ConfigFileType.Json:
                break;

            default:
                throw new NotSupportedException( string.Format( "config file type {0} is not supported.", _fileType.ToString() ) );
            }
        }

        public void SetValue<TValue>( string configName, TValue value )
        {
            _configs[ configName ] = value;
        }

        public TValue GetValue<TValue>( string configName, TValue defaultValue )
        {
            switch( _fileType )
            {
            case ConfigFileType.Xml:
                if( _configs.Any( x => x.Key.Equals( configName ) ) )
                return ( TValue )( _configs[ configName ] );
                break;

            case ConfigFileType.Json:
                break;

            default:
                break;
            }

            return defaultValue;
        }

        public IList<TValue> GetValues<TValue>( IList<string> configNames, IList<TValue> defaultValues )
        {
            return defaultValues;
        }
    }
}
