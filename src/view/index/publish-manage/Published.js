import NewsPublish from '../../../component/publish-manage/NewsPublish'
import usePublish from '../../../component/publish-manage/usePublish'
import {Button} from 'antd'

export default function Published() {
    // 2=== 已发布的
    const {dataSource,handleSunset} = usePublish(2)

    return (
        <div>
            <NewsPublish dataSource={dataSource} button={(id)=><Button danger onClick={()=>handleSunset(id)}>
                下线
            </Button>}>

            </NewsPublish>
        </div>
    )
}
