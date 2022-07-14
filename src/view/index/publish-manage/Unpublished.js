import NewsPublish from "../../../component/publish-manage/NewsPublish";
import usePublish from "../../../component/publish-manage/usePublish";
import { Button } from "antd";

export default function Unpublished() {
  // 1=== 待发布的
  const { dataSource, handlePublish } = usePublish(1);

  return (
    <div>
      <NewsPublish
        dataSource={dataSource}
        button={(id) => (
          <Button type="primary" onClick={() => handlePublish(id)}>
            发布
          </Button>
        )}
      ></NewsPublish>
    </div>
  );
}
