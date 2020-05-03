# setup image
FROM node:latest
RUN mkdir /corona-ui
COPY ./ /corona-ui

# install yarn
WORKDIR "/opt"
ENV YARN_VERSION v1.22.4
RUN wget https://github.com/yarnpkg/yarn/releases/download/v1.22.4/yarn-$YARN_VERSION.tar.gz
RUN tar zvxf yarn-$YARN_VERSION.tar.gz
RUN export PATH="$PATH:/opt/yarn-${YARN_VERSION}/bin"

# install packages
WORKDIR "/corona-ui"
RUN yarn install
EXPOSE 3000

CMD ["yarn", "start"]