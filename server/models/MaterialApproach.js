import mongoose from 'mongoose';

export default {
  // 材料进场
  name: 'MaterialApproach',
  init() {
    // 同事
    const colleague = new mongoose.Schema({
      id: { type: String },
      name: { type: String }
    });
    // 本公司或外公司人员 (可未在平台注册)
    const collaborator = new mongoose.Schema({
      // 人员ID 只有在平台注册过才有
      id: { type: String },
      // 人员姓名
      name: { type: String },
      // 邮箱
      email: { type: String },
      // 公司ID 只有在平台注册过才有
      companyId: { type: String },
      // 公司名称
      companyName: { type: String },
      // 是否在平台注册
      registered: { type: Boolean },
      //职位
      position: { type: String }
    });

    // 附件
    const atta = new mongoose.Schema({
      // 描述
      desc: { type: String },
      // 照片在硬盘上的存储路径(相对config.atta_folder的路径)
      pics: [{ type: String }],
    });

    const schema = new mongoose.Schema({
      // 工程id
      engineeringId: { type: String },

      // 装置名称
      devName: { type: String },

      // 单位工程名称
      unitEngName: { type: String },

      // 施工单位
      builder: { type: String },

      // 材料
      material: [{
        //品牌
        brand: { type: String },
        // 名称
        name: { type: String },
        // 型号
        model: { type: String },
        // 数量
        count: { type: String },
        // 单位
        unit: { type: String },
      }],

      // 项目类型: 精细化工 通用 等
      engineeringType: { type: String },

      // 监理专业(工种): 土建 工艺管道 静设备 动设备等
      specialtyProject: { type: String },

      // 监理内容
      content: { type: String },

      // 材料检验项目
      details: [{
        // 要求描述
        name: { type: String },
        // 是否合格
        qualified: { type: Boolean, default: true },
      }],

      // 检查结果
      conclusion: atta,

      //是否为建设单位指定材料
      flag:{ type: Boolean },

      // 是否同意进场
      pass: { type: Boolean },

       // 是否发送消息
      sendmsg: { type: Boolean },

      // 不同意进场描述(仅当pass=false有效)
      rejectDesc: atta,

      // 参与人
      participants: [collaborator],

      // 创建者
      creator: colleague,

      // 创建时间
      createAt: { type: Number },

      // 更新时间
      updateAt: { type: Number },
    });

    schema.index({ engineeringId: 1, createAt: 1, 'creator.id': 1 });

    mongoose.model(this.name, schema, this.name);
  }
}


