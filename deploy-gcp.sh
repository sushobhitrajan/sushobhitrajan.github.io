#!/bin/bash

# ==============================================================================
# GCP Cloud Run Deployment Script
# ==============================================================================

# REPLACE THIS with your actual GCP Project ID
PROJECT_ID="your-project-id"
SERVICE_NAME="portfolio"
REGION="us-central1"

echo "🚀 Starting deployment to GCP Cloud Run..."

# 1. Build the image using Cloud Build
echo "📦 Building Docker image..."
gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE_NAME

# 2. Deploy to Cloud Run
echo "🚢 Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
    --image gcr.io/$PROJECT_ID/$SERVICE_NAME \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated

echo "✅ Deployment complete!"
echo "🔗 Your service is live at: $(gcloud run services describe $SERVICE_NAME --platform managed --region $REGION --format='value(status.url)')"
echo ""
echo "👉 To link your custom domain (sushobhitrajan.in):"
echo "1. Go to the Cloud Run console."
echo "2. Click 'Manage Custom Domains'."
echo "3. Follow the instructions to add sushobhitrajan.in."
