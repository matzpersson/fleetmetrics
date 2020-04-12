
import 'dotenv/config';
import Metric from '../../models/metric';
import Asset from '../../models/asset';

class Sanitiser {
  constructor() {

  }

  save(topic, message) {
    let sentenceType = 'nmea0183';

    // Find or create the asset
    Asset.findOne({ key: topic }, 'key sentenceType', function (err, asset) {
      if (!asset) {
        console.log(`Creating new asset for ${topic}`);

        var newAsset = new Asset();
        newAsset.key = topic;
        newAsset.name = topic;
        newAsset.sentenceType = sentenceType;
        newAsset.save();
      } else {
        sentenceType = asset.sentenceType
      }
    })
    
    return this.create(topic, message, sentenceType)
  }

  create(topic, message, sentenceType) {
    const elements = message.split(',');

    const recorded = elements[0];
    const sentenceModel = elements[1].substring(1).toLowerCase();
    sentenceType = sentenceType.toLowerCase();

    let sentenceSchema = {};
    try {
      const sentenceClass = require(`./sentences/${sentenceType}/${sentenceModel}.js`);
      const processClass = new sentenceClass.default();
      sentenceSchema = processClass.create(elements)
    } catch (err) {
      console.log(`Sentence class not found: ${sentenceModel}. Using column numbering. Error was: ${err}`);

      // Create a column number based schema for this sentence as it is not defined in sentences
      elements.slice(2).forEach(function(element, index) {
        const fieldName = `field-${index}`;
        sentenceSchema[fieldName] = element;
      })
    }

    console.log("SENTENCE SCHEMA", sentenceSchema)

    // Save sanitised metric
    const metric = new Metric()
    metric.recorded = recorded;
    metric.data = sentenceSchema;
    metric.sentenceType = sentenceType
    metric.sentenceModel = sentenceModel;
    metric.topic = topic;
    metric.save();

    return metric;
  }
}

export default Sanitiser;
