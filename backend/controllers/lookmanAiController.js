const LookmanModel = require('../services/lookman-ai/lookmanModel');
const CCTV_KNOWLEDGE = require('../services/lookman-ai/cctvKnowledge');

const lookmanModel = new LookmanModel();

// GET /api/lookman-ai/health
exports.getHealth = (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'Lookman AI Dedicated Intelligence Core',
    version: '1.0.0',
    mode: lookmanModel.apiKey ? 'CLOUD_NEURAL_ACTIVE' : 'SOVEREIGN_STANDALONE',
    timestamp: new Date().toISOString()
  });
};

// GET /api/lookman-ai/models
exports.getModels = (req, res) => {
  res.json({
    object: 'list',
    data: lookmanModel.getAvailableModels().map(model => ({
      id: model.id,
      object: 'model',
      owned_by: 'lookman-technologies',
      description: model.description,
      capabilities: model.capabilities
    }))
  });
};

// POST /api/lookman-ai/chat/stream
exports.streamChat = async (req, res) => {
  const { messages, model, imageBase64 } = req.body || {};
  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: { message: '`messages` array is required.' } });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    for await (const { chunk, provider } of lookmanModel.streamResponse({
      messages,
      model,
      imageBase64
    })) {
      res.write(`data: ${JSON.stringify({ chunk, provider, done: false })}\n\n`);
    }
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (error) {
    console.error('[Lookman AI] Streaming error:', error);
    res.write(`data: ${JSON.stringify({ error: error.message, done: true })}\n\n`);
    res.end();
  }
};

// POST /api/lookman-ai/tools/calculate-storage
exports.calculateStorage = (req, res) => {
  const {
    cameras = 16,
    days = 30,
    resolution = '1080p',
    fps = 25,
    codec = 'H.265'
  } = req.body || {};
  const result = CCTV_KNOWLEDGE.calculateStorage(cameras, days, resolution, fps, codec);
  res.json({ success: true, result });
};

// POST /api/lookman-ai/tools/calculate-dori
exports.calculateDori = (req, res) => {
  const {
    focalLengthMm = 4,
    sensorType = '1/2.8',
    resolutionWidth = 1920
  } = req.body || {};
  const result = CCTV_KNOWLEDGE.calculateDoriDistance(
    focalLengthMm,
    sensorType,
    resolutionWidth
  );
  res.json({ success: true, result });
};
