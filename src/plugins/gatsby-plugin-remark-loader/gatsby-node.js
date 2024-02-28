exports.onCreateWebpackConfig = async ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  const RemarkSmartypants = (await import("remark-smartypants")).default
  const RemarkParse = (await import("remark-parse")).default
  const RemarkRehype = (await import("remark-rehype")).default
  const RehypeRaw = (await import("rehype-raw")).default
  const RehypeStringify = (await import("rehype-stringify")).default
  const RemarkPrism = (await import("remark-prism")).default

  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.mdx?$/,
          use: [
            {
              loader: "html-loader",
            },
            {
              loader: "remark-loader",
              options: {
                remarkOptions: {
                  plugins: [
                    RemarkParse,
                    RemarkPrism,
                    [RemarkRehype, { allowDangerousHtml: true }],
                    RehypeRaw,
                    RemarkSmartypants,
                    RehypeStringify,
                  ],
                },
              },
            },
          ],
        },
      ],
    },
  })
}
