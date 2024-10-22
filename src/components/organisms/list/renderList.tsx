import { Label } from "@/components/ui/label";

// {[key:string] 형태로 된 object를 display하는 함수입니다. }
const renderBuildingPropos = (buildPropos: { [key: string]: { name: string; count: number } }) => {
    return Object.keys(buildPropos).map((key) => {
      const { name, count } = buildPropos[key];
      return count > 0 ? (
        <div key={key} className="flex justify-between py-2 border-b">
          <Label>{name}</Label>
          <Label>{count}개</Label>
        </div>
      ) : null;
    });
  };

export {renderBuildingPropos}