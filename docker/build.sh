# bash docker/build.sh
IMAGE_NAME="leveryd/scan:cute-fe"
npm run build
docker build -t ${IMAGE_NAME} -f docker/Dockerfile .
docker push ${IMAGE_NAME}
