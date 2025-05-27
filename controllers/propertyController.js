import Property from '../models/Property.js';

// Create property with image upload
export const createProperty = async (req, res) => {
  try {
    const {
      name, location, bedrooms, bathrooms, sqft, price, authorImage, authorname
    } = req.body;

    const imagePath = req.file ? req.file.filename : null;

    const newProperty = new Property({
      name,
      location,
      bedrooms,
      bathrooms,
      sqft,
      price,
      authorImage,
      authorname,
      image: [imagePath]
    });

    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    console.error('Create Property Error:', error);  // <--- log full error to console
    res.status(400).json({ error: error.message || 'Failed to create property' }); // send detailed error message in response
  }
};


// Get all properties
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
};

// Get a single property by ID
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch property' });
  }
};
