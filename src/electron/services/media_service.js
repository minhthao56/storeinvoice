class MediaService {
  constructor({
    storePdfPath,
    fs,
    path,
    uuid,
    pdf,
    configRepository,
    dialog,
    invoiceRepository,
  }) {
    this.storePdfPath = storePdfPath;
    this.fs = fs;
    this.path = path;
    this.uuid = uuid;
    this.pdf = pdf;
    this.keyWord = [
      {
        key: "Mẫu số",
        type: 0,
      },
      {
        key: "Ký hiệu",
        type: 0,
      },
      {
        key: "Số",
        type: 0,
      },
      {
        key: "Ngày",
        type: 0,
      },
    ];
    this.configRepository = configRepository;
    this.dialog = dialog;
    this.invoiceRepository = invoiceRepository;
  }

  // The function triggered by your button
  async storeFile({ typeinvoice, companyid, datechoose, dateNow }) {
    var filePath = await this.dialog.showOpenDialogSync({
      properties: ["openFile", "multiSelections"],
      filters: [{ name: "PDF", extensions: ["pdf"] }],
    });

    if (!filePath) {
      return 0;
    }

    filePath.forEach((file) => {
      // get file name
      const fileName = this.path.basename(file);
      const extension = this.path.extname(fileName);
      const fileNameWithoutExtension = this.path.parse(fileName).name;
      const fileNameBuilder =
        fileNameWithoutExtension + "_" + this.uuid.v4() + extension;

      // copy file from original location to app data folder
      this.fs.copyFile(
        file,
        this.path.join(this.storePdfPath, fileNameBuilder),
        (err) => {
          if (err) throw err;
        }
      );

      this.analyzePdf(file).then((queue) => {
        this.invoiceRepository.create(
          {
            companyid: companyid,
            datechoose: datechoose,
            invoicesymbol: queue.find((a) => a.key === "Mẫu số")?.value || "",
            invoicetemplate:
              queue.find((a) => a.key === "Ký hiệu")?.value || "",
            invoicenumber: queue.find((a) => a.key === "Số")?.value || "",
            namebuyer: queue.find((a) => a.type === 10)?.value || "",
            nameseller: queue.find((a) => a.type === 20)?.value || "",
            typeinvoice: typeinvoice,
            namepdf: fileNameBuilder,
          },
          { dateNow }
        );
      });
    });

    return 1;
  }

  async analyzePdf(file) {
    const dataBuffer = this.fs.readFileSync(file);
    const data = await this.pdf(dataBuffer);
    let configs = await this.configRepository.getList({});

    this.keyWord = [
      ...this.keyWord,
      ...configs?.map(function (obj) {
        return {
          key: obj.title,
          type: obj.type,
        };
      }),
    ];

    let queue = [];

    if (data.text) {
      const lines = data.text.split(/\r?\n/);
      lines.forEach((line) => {
        this.keyWord.forEach((key) => {
          line = line.replace(/ *\([^)]*\) */g, "");
          if (
            !queue.find((a) => a.key === key.key && a.type === key.type) &&
            line.indexOf(key.key) > -1 &&
            line.indexOf(":") > -1
          ) {
            let exists = queue.find((a) => a.type !== 0 && a.type === key.type);
            if (!exists) {
              queue.push({
                key: key.key,
                type: key.type,
                value: this.detectResult({ key: key.key, result: line }),
              });
            }
          }
        });
      });
    }

    return queue;
  }

  detectResult({ key, result }) {
    let newStr = result;
    if (newStr.indexOf(":") > -1) {
      newStr = newStr.split(":")[1].trim();
    }

    if (key === "Ngày" && newStr) {
      let content = newStr.toLowerCase();
      if (
        content.indexOf("ngày") > -1 &&
        content.indexOf("tháng") > -1 &&
        content.indexOf("năm") > -1
      ) {
        content = content.replace("ngày", "");
        content = content.replace("tháng", "-");
        content = content.replace("năm", "-");
        content = content.replace(" ", "");

        var result = content.split("-");

        return (
          result[2].trim() + "-" + result[1].trim() + "-" + result[0].trim()
        );
      } else if (content.indexOf("/") > -1) {
        let result = content.split("/");
        return (
          result[2].trim() + "-" + result[1].trim() + "-" + result[0].trim()
        );
      }
    }

    return newStr;
  }
}

module.exports = {
  MediaService,
};
