const InfoModel = require('../models/InfoModel')
const infoMock = require('../mock/info.json')

module.exports = async () => {
  const info = await InfoModel.find()
  if (info.length !== infoMock.length) {
    await createInitialEntity(InfoModel, infoMock)
  }
}

async function createInitialEntity(Model, data) {
  Model.collection.drop()
  return Promise.all(
    data.map(async item => {
      try {
        delete item._id
        const newItem = new Model(item)
        newItem.save()
        return newItem
      } catch (err) {
        return err
      }
    })
  )
}
