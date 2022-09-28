var repository = new java.io.File(com.twinsoft.convertigo.engine.Engine.USER_WORKSPACE_PATH, "lib_FileStorage");

function log(str) {
	com.twinsoft.convertigo.engine.Engine.logEngine.info(str);
}

function initApi() {
	var api = {
		getFilePath: id => {
			try {
				var meta = getMeta(id);
				if (meta != null) {
					return new java.io.File(repository, id + "/" + meta.name).getPath();
				}
			} catch (e) {};
			api.checkExpired();
			return id;
		},
		addAutoClose: (id, closeable, lifetime) => {
			var entry = id in api._autoclose ? api._autoclose[id] : (api._autoclose[id] = {});
			var key = "" + closeable;
			var expire = new Date().getTime() + lifetime;
			log("addAutoClose for key: " + key + " expire: " + expire + " id: " + id);
			entry[key] = {closeable: closeable, expire: expire};
			api.checkExpired();
		},
		autoClose: id => {
			log("autoClose ? " + (id in api._autoclose) + " id: " + id);
			if (id in api._autoclose) {
				var entry = api._autoclose[id];
				Object.values(entry).forEach(val => {
					try {
						val.closeable.close();
					} catch (e) {}
				});
				delete api._autoclose[id];
			}
			api.checkExpired();
		},
		checkExpired: () => {
			var now = new Date().getTime();
			var expired = Object.keys(api._autoclose).filter(key => {
				return -1 != Object.values(api._autoclose[key]).findIndex(val => {
					//log("checkExpired val.expire < now: " + (val.expire < now) + " id: " + key);
					return val.expire < now;
				});
			});
			if (expired.length > 0) {
				log("checkExpired detect: " + JSON.stringify(expired));
			}
			expired.forEach(api.autoClose);
		},
		_autoclose: {},
	}
	context.project.set("api", api);
	return api;
}

function getApi() {
	var api = context.project.get("api");
	if (api == null) {
		api = initApi();
	}
	return api;
}

function getMeta(repo) {
	if (!(repo instanceof java.io.File)) {
		repo = new java.io.File(repository, repo);
	}
	var meta = new java.io.File(repo, "_meta.json");
	try {
		meta = JSON.parse(com.twinsoft.convertigo.engine.util.FileUtils.readFileToString(meta, "UTF-8"));
		return meta;
	} catch (e) {
	}
	return null;
}
