export const storageService = {
  query,
  get,
  post,
  postMany,
  put,
  _save,
  remove,
  removeEntity
}

function query(entityType) {
  let entities = JSON.parse(localStorage.getItem(entityType) || '[]')
  return Promise.resolve(entities)
}

async function get(entityType, entityId) {
  const entities = await query(entityType)
  return entities.find(entity=>entity.id === entityId)
}

function post(entityType, newEntity) {
  newEntity.id = _makeId()
  return query(entityType).then((entities) => {
    entities.push(newEntity)
    _save(entityType, entities)
    return newEntity
  })
}

function postMany(entityType, newEntities) {
  return query(entityType).then((entities) => {
    newEntities = newEntities.map((entity) => ({ ...entity, id: _makeId() }))
    entities.push(...newEntities)
    _save(entityType, entities)
    return newEntities
  })
}

function put(entityType, updatedEntity) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity.id === updatedEntity.id)
    entities.splice(idx, 1, updatedEntity)
    _save(entityType, entities)
    return updatedEntity
  })
}

function remove(entityType, entityId) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity.id === entityId)
    entities.splice(idx, 1)
    _save(entityType, entities)
  })
}

 function removeEntity(entityType) {
  localStorage.removeItem(entityType)
}

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
  let text = ''
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
