this.Schemas = this.Schemas || {};

var objKeysRegex = /({|,)(?:\s*)(?:')?([A-Za-z_$\.][A-Za-z0-9_ \-\.$]*)(?:')?(?:\s*):/g;
var json = `SIMPLE_SCHEMA`.replace(objKeysRegex, "$1\"\$2\":");		    
eval( "json="+json);
this.Schemas.COLLECTION_VAR = new SimpleSchema(json);
this.COLLECTION_VAR.attachSchema(this.Schemas.COLLECTION_VAR);
